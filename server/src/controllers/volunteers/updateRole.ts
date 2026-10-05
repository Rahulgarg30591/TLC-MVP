import { Request, Response } from "express"
import getData from "../../utils/getData"
import jwt from "jsonwebtoken";
import { UpdateVolunteerRoleById } from "../../gql/volunteers/mutations"

const updateRole = async (req: Request, res: Response) => {
  const { authorization } = req?.headers
  const id = Number(req.body?.id)
  const isAdmin = req.body?.isAdmin === true || req.body?.isAdmin === 'true'

  let token: any;
  try{
    let authToken: any = authorization
    authToken = authToken.split('Bearer ');
    authToken = authToken[1];
    token = jwt.verify(authToken, process.env.JWT_SECRET_KEY || '')
  }
  catch(err)
  {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired! Please login again.'
    })
  }
  
  if(!id || Number(token?.id) === id)
  {
    return res.status(403).json({
      status: 'error',
      message: 'You cannot update your own role!'
    })
  }
  
  const variables = { id, isAdmin }
  const data = await getData(UpdateVolunteerRoleById, variables)

  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  
  if(data?.data?.update_users?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: "User updated successfully!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "User you are updating is not found at the moment. Please try again later!"
  })

}

export default updateRole