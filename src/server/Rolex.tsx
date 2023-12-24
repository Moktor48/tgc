import { db } from '~/server/db'
import { getServerAuthSession } from '~/server/auth'


export default async function Rolex () {
    const session = await getServerAuthSession()
    await db.user.findUnique({
      where: {
        id: session.user.id,
      }
  })
  }