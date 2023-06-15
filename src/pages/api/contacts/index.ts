import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { contactValidationSchema } from 'validationSchema/contacts';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getContacts();
    case 'POST':
      return createContact();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContacts() {
    const data = await prisma.contact
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'contact'));
    return res.status(200).json(data);
  }

  async function createContact() {
    await contactValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.gift_suggestion?.length > 0) {
      const create_gift_suggestion = body.gift_suggestion;
      body.gift_suggestion = {
        create: create_gift_suggestion,
      };
    } else {
      delete body.gift_suggestion;
    }
    if (body?.meeting?.length > 0) {
      const create_meeting = body.meeting;
      body.meeting = {
        create: create_meeting,
      };
    } else {
      delete body.meeting;
    }
    if (body?.note?.length > 0) {
      const create_note = body.note;
      body.note = {
        create: create_note,
      };
    } else {
      delete body.note;
    }
    const data = await prisma.contact.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
