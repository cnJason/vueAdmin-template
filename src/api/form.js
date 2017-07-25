import fetch from '@/utils/fetch';

export function addReport(reportForm) {
  return fetch({
    url: '/reports',
    method: 'post',
    data: {
      reportForm
    }
  });
}


