import type { Request, Response } from "express";
import httpCode from "../../constants/http.code.constant";
import httpReason from "../../constants/http.reason.constant";

import prisma from "../../database/prisma.database";

async function getDurian(req: Request, res: Response) {
  const { id, owner } = req.query;

  if (id && owner) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: httpCode.BAD_REQUEST,
      error: true,
      message: httpReason.BAD_REQUEST,
    });
  }

  if (id) {
    const durian = await prisma.durian.findUnique({
      where: {
        rfid: id as string,
      },
    });

    if (!durian) {
      return res.status(httpCode.NOT_FOUND).json({
        status: httpCode.NOT_FOUND,
        error: true,
        message: httpReason.NOT_FOUND,
      });
    }

    return res.status(httpCode.OK).json({
      status: httpCode.OK,
      error: false,
      data: durian,
    });
  }

  if (owner) {
    const durians = await prisma.durian.findMany({
      where: {
        owner: owner as string,
      },
    });

    if (!durians) {
      return res.status(httpCode.NOT_FOUND).json({
        status: httpCode.NOT_FOUND,
        error: true,
        message: httpReason.NOT_FOUND,
      });
    }

    return res.status(httpCode.OK).json({
      status: httpCode.OK,
      error: false,
      data: durians,
    });
  }

  const durians = await prisma.durian.findMany();

  return res.status(httpCode.OK).json({
    status: httpCode.OK,
    error: false,
    data: durians,
  });
}

async function newDurian(req: Request, res: Response) {
  const { rfid, name, type, longitude, latitude, owner } = req.body;

  if (!rfid || !owner) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: httpCode.BAD_REQUEST,
      error: true,
      message: httpReason.BAD_REQUEST,
    });
  }

  const durian = await prisma.durian.findUnique({
    where: {
      rfid,
    },
  });

  if (durian) {
    return res.status(httpCode.CONFLICT).json({
      status: httpCode.CONFLICT,
      error: true,
      message: httpReason.CONFLICT,
    });
  }

  await prisma.durian.create({
    data: {
      rfid,
      name,
      type,
      longitude,
      latitude,
      owner,
    },
  });

  return res.status(httpCode.CREATED).json({
    status: httpCode.CREATED,
    error: false,
    message: httpReason.CREATED,
  });
}

async function updateDurian(req: Request, res: Response) {
  const { rfid, name, type, longitude, latitude, owner } = req.body;

  if (!rfid || !owner) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: httpCode.BAD_REQUEST,
      error: true,
      message: httpReason.BAD_REQUEST,
    });
  }

  const durian = await prisma.durian.findUnique({
    where: {
      rfid,
    },
  });

  if (!durian) {
    return res.status(httpCode.NOT_FOUND).json({
      status: httpCode.NOT_FOUND,
      error: true,
      message: httpReason.NOT_FOUND,
    });
  }

  await prisma.durian.update({
    where: {
      rfid,
    },
    data: {
      name,
      type,
      longitude,
      latitude,
      owner,
    },
  });

  return res.status(httpCode.OK).json({
    status: httpCode.OK,
    error: false,
    message: httpReason.OK,
  });
}

async function setGradeDurian(req: Request, res: Response) {
  const { rfid, grade } = req.body;

  if (!rfid || !grade) {
    return res.status(httpCode.BAD_REQUEST).json({
      status: httpCode.BAD_REQUEST,
      error: true,
      message: httpReason.BAD_REQUEST,
    });
  }

  const durian = await prisma.durian.findUnique({
    where: {
      rfid,
    },
  });

  if (!durian) {
    return res.status(httpCode.NOT_FOUND).json({
      status: httpCode.NOT_FOUND,
      error: true,
      message: httpReason.NOT_FOUND,
    });
  }

  await prisma.durian.update({
    where: {
      rfid,
    },
    data: {
      grade,
    },
  });

  return res.status(httpCode.OK).json({
    status: httpCode.OK,
    error: false,
    message: httpReason.OK,
  });
}

export { getDurian, newDurian, updateDurian, setGradeDurian };
