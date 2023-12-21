import { buildRequestData } from './../requestDataBuilder';
import { configurationMock } from '../../../../configuration/configuration-mock/configuration-mock';
import { OptionalParamsDto } from '../../../../configuration/dto/optional-params.dto';

describe('requestDataBuilder', () => {
  it('should build request data with mock when params are valid', () => {
    const params = {
      country_iso: '2',
      operation_type: '2',
      brand: '1',
    };

    const convertedParams = {
      ...params,
      country_iso: parseInt(params.country_iso, 10),
      operation_type: parseInt(params.operation_type, 10),
      brand: parseInt(params.brand, 10),
    };

    const result = buildRequestData(convertedParams);
    expect(result).toEqual({
      mock: configurationMock,
    });
  });

  it('should build request data with mock when params are valid', () => {
    const params = {
      country_iso: '2',
      operation_type: '2',
      brand: '1',
    };

    const convertedParams = {
      country_iso: parseInt(params.country_iso, 10),
      operation_type: parseInt(params.operation_type, 10),
      brand: parseInt(params.brand, 10),
    };

    const result = buildRequestData(convertedParams);

    expect(result.mock).toEqual(configurationMock);
  });
  it('should return an empty object when params do not match the mock', () => {
    const params = {
      country_iso: '3',
    };

    const convertedParams = {
      ...params,
      country_iso: parseInt(params.country_iso, 10),
    };

    const result = buildRequestData(convertedParams);
    expect(result).toEqual({});
  });
});
