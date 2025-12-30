import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        // Libera a rota de health check
        if (request.path === '/api/health') {
            return true;
        }

        const apiKeyHeader = request.headers['x-api-key'] as string;
        const apiKey = this.configService.get<string>('API_KEY');

        if (!apiKeyHeader || apiKeyHeader !== apiKey) {
            throw new UnauthorizedException('Invalid API Key');
        }
        return true;
    }
}
