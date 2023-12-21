import { buildRequestData } from './../requestDataBuilder';
import { configurationMock } from '../../../../configuration/configuration-mock/configuration-mock';
import { OptionalParamsDto } from '../../../../configuration/dto/optional-params.dto';

describe('buildRequestData', () => {
  it('should build request data with params', () => {
    const params: OptionalParamsDto = {
      country_iso: 2,
      operation_type: 1,
      brand: 1,
    };

    const result = buildRequestData(params);
    expect(result).toEqual({
      mock: configurationMock,
    });
  });

  it('should build request data without params', () => {
    const result = buildRequestData();
    expect(result).toEqual({});
  });
});
