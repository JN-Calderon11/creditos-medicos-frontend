

export interface IHttpResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: any | null;
  timestamp: string;
}


/*
{
  "success": false,
  "message": "Usuario o contraseña incorrectos.",
  "data": null,
  "errors": null,
  "timestamp": "2026-05-04T04:46:59.432038Z"
}



*/