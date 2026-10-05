import { Request, Response } from "express"
import getData from "../../utils/getData"
import { DeleteInvitationsByEmail, DeleteVolunteersById } from "../../gql/volunteers/mutations"
import jwt from "jsonwebtoken";

const deleteVolunteer = async (req: Request, res: Response) => {
  const { authorization } = req?.headers
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

  const ids = (req.body?.ids || [])
    .map((id: any) => Number(id))
    .filter((id: number) => id && id !== Number(token?.id))

  if(!ids.length)
  {
    return res.status(403).json({
      status: 'error',
      message: 'You cannot delete yourself!'
    })
  }

  const data = await getData(DeleteVolunteersById, { ids })

  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(data?.data?.delete_users?.affected_rows)
  {
    const emails = (data.data.delete_users.returning || [])
      .map((row: { email?: string }) => row.email)
      .filter(Boolean)
    if (emails.length) {
      await getData(DeleteInvitationsByEmail, { emails })
    }
    return res.status(200).json({
      status: 'success',
      message: "Users deleted successfully!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "Users you are deleting is not found at the moment. Please try again later!"
  })

}

export default deleteVolunteer