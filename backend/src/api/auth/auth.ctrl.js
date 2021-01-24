export const register = async (req, res) => {
  console.log(req);
  res.json('sfs');
};
export const login = async (req, res) => {
  console.log('test');
  res.json({ data: 'hello' });
};
export const verify = async (ctx) => {};
export const logout = async (ctx) => {};
