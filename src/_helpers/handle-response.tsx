export function handleResponse(response: Response): Promise<any> {
  return response.text().then((text: string) => {
    let data: any;
    try {
      data = text && JSON.parse(text);
    } catch (error) {
      // Handle JSON parse error if necessary
      return Promise.reject('Error parsing response');
    }

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // Auto logout if 401 Unauthorized or 403 Forbidden response returned from API
        //   authenticationService.logout();
        window.location.reload();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}