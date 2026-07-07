import { mutationOptions } from '@tanstack/react-query';

import { requestApi } from './api-client';
import type { ApiHttpMethod } from './api.consts';

type ApiMutationOptionsParameters<ResponseData, Variables, RequestBody = unknown> = {
  getBody?: (variables: Variables) => RequestBody;
  getRoute: (variables: Variables) => string;
  method: ApiHttpMethod;
  parseResponse: (responseBody: unknown) => ResponseData;
};

/** Создает mutation options для изменения данных через единый API client. */
export function createApiMutationOptions<ResponseData, Variables, RequestBody = unknown>(
  parameters: ApiMutationOptionsParameters<ResponseData, Variables, RequestBody>,
) {
  return mutationOptions({
    mutationFn: (variables: Variables) => {
      return requestApi<ResponseData, RequestBody>({
        body: parameters.getBody?.(variables),
        method: parameters.method,
        parseResponse: parameters.parseResponse,
        route: parameters.getRoute(variables),
      });
    },
  });
}
