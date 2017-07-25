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


export function reportsList() {
  return fetch({
    url: '/reports',
    method: 'GET'
  });
}

export function delReport(id) {
  return fetch({
    url: '/report/' + id,
    method: 'DELETE'
  });
}

export function getReport(id) {
  return fetch({
    url: '/report/' + id,
    method: 'GET'
  });
}

export function update(id, reportForm) {
  return fetch({
    url: '/report/' + id,
    method: 'GET',
    data: {
      reportForm
    }
  });
}