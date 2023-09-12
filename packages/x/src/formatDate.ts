import dayjs from 'dayjs';

export const formatDate = (value: Date | null | undefined, pickTime: boolean) => {
	if (!(value instanceof Date)) {
		return '';
	}

	return dayjs(value).format(`YYYY-MM-DD${pickTime ? ' HH:mm' : ''}`);
};
