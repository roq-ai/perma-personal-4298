import axios from 'axios';
import queryString from 'query-string';
import { GiftSuggestionInterface, GiftSuggestionGetQueryInterface } from 'interfaces/gift-suggestion';
import { GetQueryInterface } from '../../interfaces';

export const getGiftSuggestions = async (query?: GiftSuggestionGetQueryInterface) => {
  const response = await axios.get(`/api/gift-suggestions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGiftSuggestion = async (giftSuggestion: GiftSuggestionInterface) => {
  const response = await axios.post('/api/gift-suggestions', giftSuggestion);
  return response.data;
};

export const updateGiftSuggestionById = async (id: string, giftSuggestion: GiftSuggestionInterface) => {
  const response = await axios.put(`/api/gift-suggestions/${id}`, giftSuggestion);
  return response.data;
};

export const getGiftSuggestionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gift-suggestions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGiftSuggestionById = async (id: string) => {
  const response = await axios.delete(`/api/gift-suggestions/${id}`);
  return response.data;
};
