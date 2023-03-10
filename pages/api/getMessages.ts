// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*

API RETURN CODES

200 - good 👍

400 - bad request - the flight number does not exist

500 - internal server error

*/

import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises';
import path from 'path';

type Message = {
	senderID: number;
	time: number;
	content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message[]>
) {
	try {
		let { num } = req.body;
		try {
			const jsonDirectory = path.join(process.cwd(), `data/${num}.json`);
			const fileContents = await fs.readFile(jsonDirectory, 'utf8');
			res.status(200).json(JSON.parse(fileContents));
		} catch (err) {
			res.status(400).end(`Flight number does not exist! Number entered: ${num}`);
			return;
		}
	} catch (error) {
		console.error(error);
		res.status(500).end('Server error');
		return;
	}
}
