const ctx1 = document.querySelector('.js-chart-1').getContext('2d');
const ctx2 = document.querySelector('.js-chart-2').getContext('2d');
const ctx3 = document.querySelector('.js-chart-3').getContext('2d');
const ctx4 = document.querySelector('.js-chart-4').getContext('2d');

fetchData()
  .then(parseData)
  .then(data => {
    console.log(data);
    return getLabelsAndData(data);
  })
  .then(({ dates, newCases, newDeaths, cumulativeCases, cumulativeDeaths }) => {
    drawChart(ctx1, dates, newCases, {
      label: '# Amount of new cases of COVID-19',
      color: '#DC143C',
    });
    drawChart(ctx2, dates, newDeaths, {
      label: '# Amount of new deaths due to COVID-19',
      color: '#7B68EE',
    });
    drawChart(ctx3, dates, cumulativeCases, {
      label: '# Amount of cumulative cases of COVID-19',
      color: '#FF4500',
    });
    drawChart(ctx4, dates, cumulativeDeaths, {
      label: '# Amount of cumulative deaths due to COVID-19',
      color: '#DEB887',
    });
  });

function fetchData() {
  return fetch('./Covid-cases-Ukraine-WHO.csv').then(response =>
    response.text(),
  );
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getLabelsAndData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.dates.push(entry.Date_reported);
      acc.newCases.push(entry.New_cases);
      acc.newDeaths.push(entry.New_deaths);
      acc.cumulativeCases.push(entry.Cumulative_cases);
      acc.cumulativeDeaths.push(entry.Cumulative_deaths);

      return acc;
    },
    {
      dates: [],
      newCases: [],
      newDeaths: [],
      cumulativeCases: [],
      cumulativeDeaths: [],
    },
  );
}

function drawChart(context, labels, data, { label, color }) {
  new Chart(context, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          borderWidth: 1,
          fill: false,
        },
      ],
    },
  });
}
