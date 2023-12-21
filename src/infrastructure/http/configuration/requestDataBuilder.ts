// requestDataBuilder.ts

import { configurationMock } from '../../../configuration/configuration-mock/configuration-mock';
import { OptionalParamsDto } from '../../../configuration/dto/optional-params.dto';

export function buildRequestData(params?: OptionalParamsDto): any {
  const mock = configurationMock;

  if (params) {
    const { country_iso, operation_type, brand } = params;

    const convertedParams: OptionalParamsDto = {
      country_iso:
        country_iso !== undefined
          ? parseInt(country_iso.toString(), 10)
          : undefined,
      operation_type:
        operation_type !== undefined
          ? parseInt(operation_type.toString(), 10)
          : undefined,
      brand: brand !== undefined ? parseInt(brand.toString(), 10) : undefined,
    };

    if (
      !mock.some(
        (item) =>
          (convertedParams.country_iso === undefined ||
            item.country_iso === convertedParams.country_iso) &&
          (convertedParams.operation_type === undefined ||
            item.operation_type === convertedParams.operation_type) &&
          (convertedParams.brand === undefined ||
            item.brand === convertedParams.brand),
      )
    ) {
      return {};
    }
  }

  return { mock };
}
