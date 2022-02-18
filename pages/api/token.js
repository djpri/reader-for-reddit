import axios from "axios";

export const getAccessTokenFromReddit = async () => {
  const form = new URLSearchParams();
  form.append("grant_type", "client_credentials");

  const { data } = await axios({
    url: "https://www.reddit.com/api/v1/access_token",
    method: "post",
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET,
    },
    data: form,
  });
  return data.access_token;
};

export default async function handler(req, res) {
  const accessToken = await getAccessTokenFromReddit();
  res.status(200).json(accessToken);
}
