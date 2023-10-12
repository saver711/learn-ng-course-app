export type ErrorResponse = {
    status: number;
    ok: false;
    error: {
      error: {
        code: number;
        message: string;
        errors: {
          message: string;
          domain: string;
          reason: string;
        }[];
      };
    };
  }
  