import axios from 'axios';
import { getItemAsync } from 'expo-secure-store';

import { Response200, Response204 , Response200NoData} from '@/interfaces/ResponseCodes';
import {
  AdminRegisterData,
  LoginData,
  StudentRegisterData,
  addSupervisorData,
  generateOutPassData,
} from '@/interfaces/ApiDTO';
import convertLocalImageUrlToBase64Url from '@/utils/convertLocalImageUrlToBase64Url';
import {
  SearchResultsData,
  TokenData,
  OutpassResultsData,
  getTokenData,
  CheckedTokensData,
  getSupervisorData,
  ProfileData,
  TokenStats,
  NotificaitonResultsData,
  UserData,
  OutpassHandledByManagerData,
  AdminCheckData,
} from '@/interfaces/ApiResults';
import { OutPassCardManagerProps } from '@/interfaces/CustomCardManagerProps';

export const getSearchResults = async (searchString: string): Promise<SearchResultsData[]> => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/organization?name=${encodeURIComponent(searchString)}`,
    );

    const res: Response200<SearchResultsData[]> = response.data;
    return res.data;
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

export const getNotification = async (): Promise<NotificaitonResultsData[]> => {
  try {
    console.log('hello');
    // const jwtToken = await getItemAsync('token');
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/notificaiton`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    // console.log('responce', response);
    const res: Response200<NotificaitonResultsData[]> = response.data;
    return res.data;
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const sendNotification = async (topic: string, title:string, description:string):Promise<Response200NoData> =>  {
  const data = { topic, title, description }
  const jwtToken = await getItemAsync('token');
  try {
    const response: Response200NoData = (await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/notificaiton`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })).data;
    console.log(response);
    return response;
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
}

export const LoginApi = async (data: LoginData): Promise<UserData> => {
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`, data);

    if (response.status === 200) {
      const res: Response200<UserData> = response.data;
      return res.data;
    }
  } catch (error) {
    if ([400, 401, 404, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const studentRegister = async (data: StudentRegisterData): Promise<TokenData> => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (key === 'profileImg' && data[key]) {
        formData.append(key, await convertLocalImageUrlToBase64Url(data[key]));
      } else formData.append(key, data[key]);
    }

    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register/peoples`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const res: Response200<TokenData> = response.data;
    return res.data;
  } catch (error) {
    if ([400, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const adminRegister = async (data: AdminRegisterData): Promise<TokenData> => {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (['organizationLogo', 'profileImg'].includes(key) && data[key])
        formData.append(key, await convertLocalImageUrlToBase64Url(data[key]));
      else if ((key === 'startTime' || key === 'endTime') && data[key]) formData.append(key, data[key].toISOString());
      else formData.append(key, data[key]);
    }
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/register/admin`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const res: Response200<TokenData> = response.data;
    return res.data;
  } catch (error) {
    if ([400, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const GetStudentOutpasses = async (outpassType: string): Promise<OutpassResultsData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/${outpassType}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response200<OutpassResultsData[]> = response.data;
    return res.data.map(data => {
      data.startTime = new Date(data.startTime);
      data.endTime = new Date(data.endTime);
      return data;
    });
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const rejectedStudentOutpass = async (): Promise<OutpassResultsData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/rejectedOutpass`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response200<OutpassResultsData[]> = response.data;
    return res.data.map(data => {
      data.startTime = new Date(data.startTime);
      data.endTime = new Date(data.endTime);
      return data;
    });
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getToken = async (tokenId: string): Promise<getTokenData> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/user/getToken?tokenId=${encodeURIComponent(tokenId)}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );

    const res: Response200<getTokenData> = response.data;
    res.data.startTime = new Date(res.data.startTime);
    res.data.endTime = new Date(res.data.endTime);

    return res.data;
  } catch (error) {
    if ([401, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const checkToken = async (tokenId: string): Promise<void> => {
  try {
    const jwtToken = await getItemAsync('token');
    await axios.patch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/checker/checkToken`,
      { tokenId },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
  } catch (error) {
    if ([400, 404, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const generateOutPass = async (data: generateOutPassData): Promise<TokenData> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/requestToken`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 201) {
      const res: Response200<TokenData> = response.data;
      return res.data;
    }
  } catch (error) {
    if ([401, 500].includes(error.response.status)) {
      throw new Error(JSON.stringify(error.response.data));
    } else throw new Error('Unknown Error');
  }
};

export const getCheckedTokens = async (search?: string | null): Promise<CheckedTokensData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/checker/checkedTokens${!search ? '' : `?search=${encodeURIComponent(search)}`}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
    const res: Response200<CheckedTokensData[]> = response.data;

    return res.data.map(data => {
      if (data.exitTime) data.exitTime = new Date(data.exitTime);
      if (data.returnedTime) data.returnedTime = new Date(data.returnedTime);
      return data;
    });
  } catch (error) {
    if ([401, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getSupervisor = async (): Promise<getSupervisorData> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/admin/supervisors`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const res: Response200<getSupervisorData> = response.data;
    return res.data;
  } catch (error) {
    if ([400, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const addSupervisor = async (data: addSupervisorData): Promise<void> => {
  try {
    const jwtToken = await getItemAsync('token');
    await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/admin/supervisors`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return;
  } catch (error) {
    if ([400, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getProfile = async (): Promise<ProfileData> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const res: Response200<ProfileData> = response.data;
    res.data.unrestrictedStartTime = new Date(res.data.unrestrictedStartTime);
    res.data.unrestrictedEndTime = new Date(res.data.unrestrictedEndTime);
    return res.data;
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const updateProfile = async (
  data: Partial<(Pick<ProfileData, 'name' | 'phoneNumber' | 'profileImg'>) | { password: string }>,
): Promise<void> => {
  try {
    if (Object.keys(data).length === 0) throw new Error('No data to update');
    const jwtToken = await getItemAsync('token');
    const formData = new FormData();
    for (const key in data) {
      if (key === 'profileImg' && data[key]) {
        formData.append(key, await convertLocalImageUrlToBase64Url(data[key]));
      } else formData.append(key, data[key]);
    }

    await axios.put(`${process.env.EXPO_PUBLIC_BACKEND_URL}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return;
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getTokenStats = async (): Promise<TokenStats> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/manager/tokens/stats`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response.status === 200) {
      const res: Response200<TokenStats> = response.data;
      return res.data;
    }
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getCheckIns = async (): Promise<AdminCheckData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/admin/checkIn`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response200<AdminCheckData[]> = response.data;
    return res.data.map(data => {
      data.exitTime = new Date(data.exitTime);  
      data.returnedTime = new Date(data.returnedTime);
      return data;
    });
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getPendingOutPass = async (): Promise<(OutpassResultsData & { name: string; profileImg: string })[]> => {
  try {
    const jwtToken = await getItemAsync('token');

    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/manager/tokens/pending`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response200<(OutpassResultsData & { name: string; profileImg: string })[]> = response.data;
    return res.data;
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const acceptToken = async (data: { token: string }): Promise<void> => {
  try {
    const jwtToken = await getItemAsync('token');
    await axios.patch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/manager/token/accept`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return;
  } catch (error) {
    if ([400, 404, 304, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const rejectToken = async (data: { token: string }): Promise<string> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.patch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/manager/token/reject`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response204 = response.data;
    return res.message;
  } catch (error) {
    if ([400, 404, 304, 500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const OutpassHandledByManager = async (type: string): Promise<OutpassHandledByManagerData[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/manager/tokens/${type}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const res: Response200<OutpassHandledByManagerData[]> = response.data;
    return res.data.map(data => {
      data.startTime = new Date(data.startTime);
      data.endTime = new Date(data.endTime);
      return data;
    });
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};

export const getCheckOut = async (): Promise<Omit<AdminCheckData, 'status' | 'returnedTime'>[]> => {
  try {
    const jwtToken = await getItemAsync('token');
    const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/admin/checkOut`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const res: Response200<Omit<AdminCheckData, 'status' | 'returnedTime'>[]> = response.data;
    return res.data.map(data => {
      data.exitTime = new Date(data.exitTime);
      return data;
    });
  } catch (error) {
    if ([500].includes(error.response?.status)) {
      throw new Error(JSON.stringify(error.response?.data));
    } else throw new Error('Unknown Error');
  }
};
