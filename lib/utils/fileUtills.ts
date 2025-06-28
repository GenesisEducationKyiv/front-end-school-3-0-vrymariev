import { Result, err, ok } from 'neverthrow';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const validateFile = (acceptedFiles: File[]): Result<File, Error> => {
	const newFile = acceptedFiles[0];

	if (!newFile) {
		return err(new Error('No file provided'));
	}

	if (newFile.size > MAX_FILE_SIZE) {
		return err(new Error('File is too big'));
	}

	return ok(newFile);
};