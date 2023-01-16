/* eslint-disable @typescript-eslint/no-explicit-any */
export const userMap = (rows: any) => {
  return rows.map((user: any) => {
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user
  })
}