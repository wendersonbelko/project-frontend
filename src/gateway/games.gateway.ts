import { api } from './api';

export const listGames = async (
  pagination: { page: number, pageSize: number },
  filter?: { gameName?: string, providerId?: string }
) => {
  try {
    const response = await api.get(
      `/game/playconnect?page=${pagination.page}&pageSize=${pagination.pageSize}`,
      { params: filter }
    );
    return response.data;
  } catch (error) {
    return error.response?.data || { message: 'An error occurred' };
  }
};

export const alterEnabled = async (id: string) => {
  try {
    const response = await api.patch(`/game/playconnect/alter-enabled/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
