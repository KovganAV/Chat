import { request } from "@/api/request";

export const addMessage = async (user_id: string, user_name: string, content: string) => {
  const response = await request({
    url: "/messages",
    method: "POST",
    data: {
      user_id,
      user_name,
      content
    },
  });

  return response;
};

export const updateMessage = async (messageId: string, user_id: string, content: string) => {
  const response = await request({
    url: `/messages/${messageId}`,
    method: "PATCH",
    data: {
      user_id,
      content
    },
  });

  return response;
};

export const deleteMessage = async (messageId: string, user_id: string) => {
  const response = await request({
    url: `/messages/${messageId}`,
    method: "DELETE",
    data: {
      user_id
    },
  });

  return response;
};
