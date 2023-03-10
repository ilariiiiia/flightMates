// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*



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
  res: NextApiResponse<string>
) {
	try {
		try {
			let { id, num, content } = req.query;
			let message : Message = {
				senderID : id,
				time : Date.now(),
				content : content
			}
			const jsonDirectory = path.join(process.cwd(), `data/${num}`);
			fileContents = await fs.readFile(jsonDirectory, 'utf8');
			fileContents.push(message);
			await fs.writeFile(
				jsonDirectory,
				JSON.stringify(fileContents, null, 2)
			);
		} catch(e) {
			res.status(400).end("Bad request!");
			return;
		}
	} catch (error) {
		console.error(error);
		res.status(500).end('Server error');
		return;
	}
}
