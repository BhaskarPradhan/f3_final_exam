document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const sortByMarketCapBtn = document.getElementById('sortByMarketCapBtn');
    const sortByPercentageBtn = document.getElementById('sortByPercentageBtn');
    const cryptoTableBody = document.getElementById('cryptoTableBody');
  
    let cryptoData = [];
  
    // Fetch data using async/await
    async function fetchData() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        cryptoData = await response.json();
        renderData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Fetch data on page load
    fetchData();
  
    // Render table data
    function renderData(data = cryptoData) {
      cryptoTableBody.innerHTML = '';
      data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${coin.symbol.toUpperCase()} - ${coin.name}</td>
          <td>${coin.symbol}</td>
          <td>${coin.market_cap}</td>
          <td>${coin.current_price}</td>
          <td>${coin.total_volume}</td>
          <td>${coin.price_change_percentage_24h}</td>
        `;
        cryptoTableBody.appendChild(row);
      });
    }
  
    // Search functionality
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = cryptoData.filter(coin => coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm));
      renderData(filteredData);
    });
  
    // Sort by market cap
    sortByMarketCapBtn.addEventListener('click', () => {
      cryptoData.sort((a, b) => b.market_cap - a.market_cap);
      renderData();
    });
  
    // Sort by percentage change
    sortByPercentageBtn.addEventListener('click', () => {
      cryptoData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderData();
    });
  });
  