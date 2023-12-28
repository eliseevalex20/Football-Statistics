import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedCount, setSelectedCount] = useState('');
  const [matchStats, setMatchStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [teamStats, setTeamStats] = useState(null);
  const handleStatisticsButtonClick = () => {
    // Get the table by ID
    const table = document.getElementById('main-table');
  
    // Check if the table exists
    if (table) {
      // Query for rows only within the tbody of the table
      const tableRows = table.querySelectorAll('tbody tr');
  
      // Extract match data from the HTML table
      const matchesData = Array.from(tableRows).map(row => {
        const columns = row.querySelectorAll('td');
        const date = columns[0].textContent;
        const team1 = columns[1].textContent;
        const team2 = columns[2].textContent;
        const score = columns[3].textContent;
  
        return { date, team1, team2, score };
      });
  
      // Include selected team in the payload
      const payload = {
        selectedTeam: selectedTeam,
        matches: matchesData,
      };
  
      // Make a POST request to send payload to the server
      axios.post('http://localhost:5000/team-stats', payload)
        .then(response => {
          // Handle the response from the server
          console.log('Team statistics:', response.data);
          setTeamStats(response.data); // Assuming you have a state variable for teamStats
        })
        .catch(error => {
          console.error('Error calculating team stats', error);
        });
    } else {
      console.error('Table not found with ID: main-table');
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/countries')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error loading countries', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios.get(`http://localhost:5000/leagues/${selectedCountry}`)
        .then((response) => {
          setLeagues(response.data);
        })
        .catch((error) => {
          console.error('Error loading leagues', error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedLeague) {
      axios.get(`http://localhost:5000/teams/${selectedCountry}/${selectedLeague}`)
        .then((response) => {
          setTeams(response.data);
        })
        .catch((error) => {
          console.error('Error loading teams', error);
        });
    }
  }, [selectedLeague, selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedLeague && selectedTeam && selectedCount) {
      axios.get(`http://localhost:5000/match-stats/${selectedCountry}/${selectedLeague}/${selectedTeam}/${selectedCount}`)
        .then((response) => {
          setMatchStats(response.data);
        })
        .catch((error) => {
          console.error('Error loading match stats', error);
        });
    }
  }, [selectedTeam, selectedCount, selectedLeague, selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedLeague && selectedTeam && selectedCount) {
      axios.get(`http://localhost:5000/match-stats/${selectedCountry}/${selectedLeague}/${selectedTeam}/${selectedCount}/${selectedYear}`)
        .then((response) => {
          setMatchStats(response.data);
        })
        .catch((error) => {
          console.error('Error loading match stats', error);
        });
    }
  }, [selectedTeam, selectedCount, selectedLeague, selectedCountry, selectedYear]);

  useEffect(() => {
    if (selectedCountry && selectedLeague && selectedTeam && selectedCount) {
      axios.get(`http://localhost:5000/match-stats/${selectedCountry}/${selectedLeague}/${selectedTeam}/${selectedCount}/${selectedYear}/${selectedLocation}`)
        .then((response) => {
          setMatchStats(response.data);
        })
        .catch((error) => {
          console.error('Error loading match stats', error);
        });
    }
  }, [selectedTeam, selectedCount, selectedLeague, selectedCountry, selectedYear, selectedLocation]);


  // JSX-разметка
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2em', textAlign: 'center', marginBottom: '20px', color: '#3498db' }}>Football Statistics App</h1>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="countries">Select Country:</label>
          <select style={{ width: '150px' }} id="countries" onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">Select</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="leagues">Select League:</label>
          <select style={{ width: '150px' }} id="leagues" onChange={(e) => setSelectedLeague(e.target.value)}>
            <option value="">Select</option>
            {leagues.map((league) => (
              <option key={league} value={league}>
                {league}
              </option>
            ))}
          </select>
        </div>
  
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="teams">Select Team:</label>
          <select style={{ width: '150px' }} id="teams" onChange={(e) => setSelectedTeam(e.target.value)}>
            <option value="">Select</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="matchCount">Select Match Count:</label>
          <select id="matchCount" onChange={(e) => setSelectedCount(e.target.value)}>
            <option value="">Select</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="years">Select Year:</label>
          <select id="years" onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="All">All</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="locations">Select Location:</label>
          <select id="locations" onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="All">All</option>
            <option value="Home">Home</option>
            <option value="Away">Away</option>
          </select>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.5em', marginBottom: '10px', textAlign: 'center', color: '#27ae60' }}>Match Statistics</h2>
        <table id="main-table" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ecf0f1' }}>
          <thead style={{ background: '#3498db', color: '#fff', borderBottom: '2px solid #ddd' }}>
            <tr>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Team 1</th>
              <th style={tableHeaderStyle}>Team 2</th>
              <th style={tableHeaderStyle}>Score</th>
            </tr>
          </thead>
          <tbody>
            {matchStats.map((match) => (
              <tr key={match.IdMatch}>
                <td style={tableCellStyle}>{match.Date}</td>
                <td style={tableCellStyle}>{match.NameTeam1}</td>
                <td style={tableCellStyle}>{match.NameTeam2}</td>
                <td style={tableCellStyle}>{match.ScoreMatch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
          style={{
            padding: '10px',
            fontSize: '1em',
            backgroundColor: '#3498db',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={handleStatisticsButtonClick}
        >
          Get Team Statistics
        </button>        
      {/* Блок для отображения статистики команды */}
      {teamStats && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ fontSize: '1.5em', marginBottom: '10px', textAlign: 'center', color: '#e74c3c' }}>Team Statistics</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ecf0f1' }}>
            <tbody>
              <tr>
                <td style={tableHeaderStyle}>Wins</td>
                <td style={tableCellStyle}>{teamStats.wins}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Draws</td>
                <td style={tableCellStyle}>{teamStats.draws}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Losses</td>
                <td style={tableCellStyle}>{teamStats.losses}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Goals Scored</td>
                <td style={tableCellStyle}>{teamStats.goalsScored}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Goals Conceded</td>
                <td style={tableCellStyle}>{teamStats.goalsConceded}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Max Goals in a Match</td>
                <td style={tableCellStyle}>{teamStats.maxGoalsInMatch}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Min Goals in a Match</td>
                <td style={tableCellStyle}>{teamStats.minGoalsInMatch}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Max Opponent Goals</td>
                <td style={tableCellStyle}>{teamStats.maxOpponentGoals}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Min Opponent Goals</td>
                <td style={tableCellStyle}>{teamStats.minOpponentGoals}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Average Goals Scored</td>
                <td style={tableCellStyle}>{teamStats.averageGoalsScored}</td>
              </tr>
              <tr>
                <td style={tableHeaderStyle}>Average Goals Conceded</td>
                <td style={tableCellStyle}>{teamStats.averageGoalsConceded}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Образец стилей для заголовков таблицы
const tableHeaderStyle = {
  padding: '15px',
  textAlign: 'left',
};

// Образец стилей для ячеек таблицы
const tableCellStyle = {
  padding: '15px',
  textAlign: 'left',
};

export default App;
