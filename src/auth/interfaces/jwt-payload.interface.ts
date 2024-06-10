export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  id: number;
  name: string;
}
