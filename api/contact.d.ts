type ContactRequest = {
  method?: string;
  body?: unknown;
};
type ContactResponse = {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => ContactResponse;
  json: (body: unknown) => ContactResponse;
};

export default function handler(
  request: ContactRequest,
  response: ContactResponse,
): Promise<unknown>;
