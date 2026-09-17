import { Request, Response } from "express"
import { capitaliseStr, enrollmentConstraintMessage, formatDate, normalizeMobile } from "../../utils/global"
import getData from "../../utils/getData"
import { addEnrollment } from "../../gql/enrollments/mutations"

const newEnrollment = async (req: Request, res: Response) => {
  const mobile_number = normalizeMobile(req?.body?.mobile_number)
  if (!mobile_number) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid 10-digit mobile number',
    })
  }

  const emailRaw = (req?.body?.email || '').trim()
  const children = req?.body?.children?.map((child: any)=>{
    return {
      dob: formatDate(child.dob), 
      gender: child.gender, 
      name: capitaliseStr(child.name)
    }
  })

  const variables = {
    ...req?.body,
    mobile_number,
    enrolled_by: req?.body?.enrolled_by?.toLowerCase(),
    state: capitaliseStr(req?.body?.state),
    name: capitaliseStr(req?.body?.name),
    email: emailRaw ? emailRaw.toLowerCase() : null,
    children
  }

  const data = await getData(addEnrollment, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: enrollmentConstraintMessage(data?.errors[0]?.message)
    })
  }

  if(data?.data?.insert_enrollments?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Enrollment inserted successfully'
    })
  }

  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })

}

export default newEnrollment