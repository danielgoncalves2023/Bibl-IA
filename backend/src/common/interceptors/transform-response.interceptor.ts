import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    _context: unknown,
    next: CallHandler,
  ): Observable<object | null | undefined> {
    return next.handle().pipe(map((data) => this.transformKeys(data)));
  }

  private transformKeys(obj: unknown): object | null | undefined {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformKeys(item));
    }

    if (typeof obj === 'object') {
      const transformed: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(
        obj as Record<string, unknown>,
      )) {
        const camelKey = this.toCamelCase(key);
        transformed[camelKey] = this.transformKeys(value);
      }

      return transformed;
    }

    return obj;
  }

  private toCamelCase(str: string): string {
    return str.replace(
      /_([a-z])/g,
      (_match: string, letter: string): string => {
        return letter.toUpperCase();
      },
    );
  }
}
