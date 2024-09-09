// firebase-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { firebaseAdmin } from "./firebase-admin";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  private readonly googleClient = new OAuth2Client(
    "729364707171-5n9093hp5a9951q89mknr3hioei7r2es.apps.googleusercontent.com"
  );

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const decodedToken = await this.verifyToken(token);
      console.log("decodedToken", decodedToken);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const [type, token] = authHeader.split(" ");
    return type === "Bearer" ? token : null;
  }

  private async verifyToken(token: string): Promise<any> {
    try {
      // Try to verify the token as a Firebase ID token
      return await firebaseAdmin.auth().verifyIdToken(token);
    } catch (error) {
      // If verification fails, try to verify it as a Google ID token
      try {
        const ticket = await this.googleClient.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
      } catch (googleError) {
        // If verification fails, try to verify it as a backend JWT token
        try {
          return this.jwtService.verify(token);
        } catch (jwtError) {
          throw new UnauthorizedException("Invalid token");
        }
      }
    }
  }
}
