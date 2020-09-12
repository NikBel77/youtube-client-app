import { TokenInterceptor } from './token-interceptor';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { apiSettings } from 'src/app/core/models/youtube-api.model';

describe('TokenInterceptor', () => {
  const next: HttpHandler = jasmine.createSpyObj(['handle']);
  const request: HttpRequest<null> = jasmine.createSpyObj(['clone']);
  let interceptor: TokenInterceptor = new TokenInterceptor();

  it('should create an instance', () => {
    expect(interceptor).toBeTruthy();
  });

  it('intersept should call clone and handle methods', () => {
    interceptor.intercept(request, next);

    expect(next.handle).toHaveBeenCalled();
    expect(request.clone).toHaveBeenCalled();
    expect(request.clone).toHaveBeenCalledWith({
      setParams: { 'key': apiSettings.apiKey }
    });
  });
});
