import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from '../tag.service'; // Substitua pelo caminho real do seu serviço
import axios from 'axios';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';

jest.mock('axios');

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should fetch and transform data correctly', async () => {
      const mockIdConfiguration = 'mockId';
      const mockResponseData = {
        docs: [
          {
            id: '1',
            id_configuration: 'configId',
            name: 'TagName',
            description: 'TagDescription',
            // ... outras propriedades
          },
          // ... mais documentos
        ],
      };

      // Configura o comportamento do axios.get para simular uma resposta de sucesso
      jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.getAll(mockIdConfiguration);

      // Verifica se axios.get foi chamado com os parâmetros esperados
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/tag/${mockIdConfiguration}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      // Verifica se o método transformou os dados corretamente
      expect(result).toEqual([
        {
          id: '1',
          id_configuration: 'configId',
          name: 'TagName',
          description: 'TagDescription',
          // ... outras propriedades transformadas
        },
        // ... mais objetos transformados
      ]);
    });

    it('should handle errors and return an empty array', async () => {
      const mockIdConfiguration = 'mockId';

      // Configura o comportamento do axios.get para simular um erro
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Mock Error'));

      const result = await service.getAll(mockIdConfiguration);

      // Verifica se axios.get foi chamado com os parâmetros esperados
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/tag/${mockIdConfiguration}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      // Verifica se o método retorna um array vazio em caso de erro
      expect(result).toEqual([]);
    });
  });
  describe('getById', () => {
    it('should fetch and transform data correctly', async () => {
      const mockId = 'mockId';
      const mockResponseData = {
        id: '1',
        id_configuration: 'configId',
        name: 'TagName',
        description: 'TagDescription',
        // ... outras propriedades
      };

      // Configura o comportamento do axios.get para simular uma resposta de sucesso
      jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.getById(mockId);

      // Verifica se axios.get foi chamado com os parâmetros esperados
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/tag/id/${mockId}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      // Verifica se o método transformou os dados corretamente
      expect(result).toEqual({
        id: '1',
        id_configuration: 'configId',
        name: 'TagName',
        description: 'TagDescription',
        // ... outras propriedades transformadas
      });
    });

    it('should handle errors and return an empty object', async () => {
      const mockId = 'mockId';

      // Configura o comportamento do axios.get para simular um erro
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Mock Error'));

      const result = await service.getById(mockId);

      // Verifica se axios.get foi chamado com os parâmetros esperados
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API}/tag/id/${mockId}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      // Verifica se o método retorna um objeto vazio em caso de erro
      expect(result).toEqual({});
    });
  });

  describe('create', () => {
    it('should create a new tag successfully', async () => {
      const mockNewTag: CreateTagDto = {
        id_configuration: '123',
        name: 'name',
        description: 'description',
        path_in: 'path_in',
        path_out: 'path_out',
        type_tag: 'type_tag',
        variable_data: 'variable_data',
        position_iso: 123,
        size: 123,
        active: true,
      };

      const mockResponseData = {
        // mock response data
      };

      // Configura o comportamento do axios.post para simular uma resposta de sucesso
      jest.spyOn(axios, 'post').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.create(mockNewTag);

      // Verifica se axios.post foi chamado com os parâmetros esperados
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API}/tag`,
        mockNewTag,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      // Verifica se o método retornou os dados corretos
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors and throw an error', async () => {
      const mockNewTag: CreateTagDto = {
        id_configuration: '123',
        name: 'name',
        description: 'description',
        path_in: 'path_in',
        path_out: 'path_out',
        type_tag: 'type_tag',
        variable_data: 'variable_data',
        position_iso: 123,
        size: 123,
        active: true,
      };

      // Configura o comportamento do axios.post para simular um erro
      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Mock Error'));

      await expect(service.create(mockNewTag)).rejects.toThrowError(
        'Mock Error',
      );

      // Verifica se axios.post foi chamado com os parâmetros esperados
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.API}/tag`,
        mockNewTag,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );
    });
  });

  describe('update', () => {
    it('should update a tag successfully', async () => {
      const mockId = 'mockId';
      const mockUpdateTag: UpdateTagDto = {
        id_configuration: '123',
        name: 'name',
        description: 'description',
        path_in: 'path_in',
        path_out: 'path_out',
        type_tag: 'type_tag',
        variable_data: 'variable_data',
        position_iso: 123,
        size: 123,
        active: true,
      };

      const mockResponseData = {
        // mock response data
      };

      // Configura o comportamento do axios.put para simular uma resposta de sucesso
      jest.spyOn(axios, 'put').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.update(mockId, mockUpdateTag);

      // Verifica se axios.put foi chamado com os parâmetros esperados
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API}/tag/${mockId}`,
        mockUpdateTag,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      // Verifica se o método retornou os dados corretos
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors and throw an error', async () => {
      const mockId = 'mockId';
      const mockUpdateTag: UpdateTagDto = {
        id_configuration: '123',
        name: 'name',
        description: 'description',
        path_in: 'path_in',
        path_out: 'path_out',
        type_tag: 'type_tag',
        variable_data: 'variable_data',
        position_iso: 123,
        size: 123,
        active: true,
      };

      // Configura o comportamento do axios.put para simular um erro
      jest.spyOn(axios, 'put').mockRejectedValueOnce(new Error('Mock Error'));

      await expect(service.update(mockId, mockUpdateTag)).rejects.toThrowError(
        'Mock Error',
      );

      // Verifica se axios.put foi chamado com os parâmetros esperados
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.API}/tag/${mockId}`,
        mockUpdateTag,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );
    });
  });

  describe('delete', () => {
    it('should delete a tag successfully', async () => {
      const mockId = 'mockId';

      const mockResponseData = {
        // mock response data
      };

      // Configura o comportamento do axios.delete para simular uma resposta de sucesso
      jest.spyOn(axios, 'delete').mockResolvedValueOnce({
        data: mockResponseData,
      });

      const result = await service.delete(mockId);

      // Verifica se axios.delete foi chamado com os parâmetros esperados
      expect(axios.delete).toHaveBeenCalledWith(
        `${process.env.API}/tag/${mockId}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );

      // Verifica se o método retornou os dados corretos
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors and throw an error', async () => {
      const mockId = 'mockId';

      // Configura o comportamento do axios.delete para simular um erro
      jest
        .spyOn(axios, 'delete')
        .mockRejectedValueOnce(new Error('Mock Error'));

      await expect(service.delete(mockId)).rejects.toThrowError('Mock Error');

      // Verifica se axios.delete foi chamado com os parâmetros esperados
      expect(axios.delete).toHaveBeenCalledWith(
        `${process.env.API}/tag/${mockId}`,
        {
          headers: { country: 'br', tenant: 'santander' },
        },
      );
    });
  });
});
