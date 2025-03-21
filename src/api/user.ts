/*
 * @Description: 
 * @Author: hexueying
 * @Date: 2025-03-19 16:25:01
 * @LastEditors: hexueying
 * @LastEditTime: 2025-03-19 17:30:40
 * @FilePath: user.ts
 */
// api/user.ts
import request from '@/utils/request'

export const getUserInfo = (id: string) => {
  return request.get(`/user/${id}`)
}
