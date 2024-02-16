<?php
if (isset($_COOKIE['username']) && isset($_COOKIE['avatar'])) {
    $username = $_COOKIE['username'];
    $avatarURL = $_COOKIE['avatar'];

    include('config.php');

?>

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content   ="width=device-width, initial-scale=1.0">
                <title>The Gaming Council</title>
                <link rel="stylesheet" href="leaderboardStyle.css">
                <link rel="icon" type="image/x-icon" href="icons/TGCLogo.gif">
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            </head>
            <body>
                <header>
                    <img src="icons/TGCLogo.gif" alt="Gaming News Logo" id="logo">
                    <div class="title-dropdown-container">
                        <h1>The Gaming Council</h1>
                        <nav>
                            <div class="dropdown">
                                <button class="dropbtn">Builds<span class="triangle-down"></span></button>
                                <div class="dropdown-content">
                                    <a href="#">Option 1</a>
                                    <a href="#">Option 2</a>
                                    <a href="#">Option 3</a>
                                </div>
                            </div>
                            <div class="dropdown">
                                <button class="dropbtn">Guides<span class="triangle-down"></span></button>
                                <div class="dropdown-content">
                                <a href="#">Baldur&apos;s Gate 3</a>
                                <a href="#">SWTOR</a>
                                    <a href="#">FFXIV</a>
                                </div>
                            </div>
                            <div class="dropdown">
                                <button class="dropbtn">Test<span class="triangle-down"></span></button>
                                <div class="dropdown-content">
                                    <a href="#">Option 7</a>
                                    <a href="#">Option 8</a>
                                    <a href="#">Option 9</a>
                                </div>
                            </div>
                            <div class="dropdown">
                            <button id="avatar" class="dropbtn">
                                <i class="fa fa-bars" id="sidebar-toggle"></i>
                            </button>
                            <div id="sidebar" class="sidebar">
                            <div class="sidebar-header">
                            <i id="closeSidebar" class="fa fa-times"></i>
                        </div>
                        <ul class="sidebar-links">
                            <a class="sidebar-buttons" href="#testButton">
                            <span class="material-symbols-outlined">browse_activity </span> Your Activity
                            </a>
                            <a class="sidebar-buttons" href="#button2">
                            <span class="material-symbols-outlined">query_stats</span> Users Activity
                            </a>
                            <a class="sidebar-buttons" href="#button2">
                            <span class="material-symbols-outlined">groups</span> FF/SWTOR Staff
                            </a>
                            <a class="sidebar-buttons" href="#button3">
                            <span class="material-symbols-outlined">groups_3 </span> ESO Staff
                            </a>
                            <a class="sidebar-buttons" href="#button4">
                            <span class="material-symbols-outlined">leaderboard</span> Leaderboard
                            </a>
                            
                            <a class="sidebar-buttons" href="logout.php">
                            <span class="material-symbols-outlined">logout</span> Logout
                            </a>
                        </ul>


                                <div class="bottom-username">
                                    <div class="user-avatar">
                                        <img src="<?php echo $avatarURL; ?>" alt="User Avatar">
                                        <span class="username"><?php echo $username; ?></span>
                                        <i class="fa fa-cog" id="settingsIcon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </nav>
                    </div>
                </header>
            
            <main>

            <main>
<div class="leaderboard">
    <div class="tables">
        <div class="leaderboard-content">
            <h2>Leaderboard</h2>
            <div class="leaderboard-table">
                <div class="black-line"></div>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Points</th>
                            <th>Passed</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
    // Function to calculate total points for duties
    function calculatePoints($duties) {
        $points = 0;

        foreach ($duties as $duty) {
            $duty_type = $duty['duty_type'];
            $frequency = $duty['frequency'];

            // Calculate points based on duty type and frequency (Add your logic here)
            $points += calculateDutyPoints($duty_type, $frequency);
        }

        return $points;
    }

    // Function to calculate points for a specific duty type
    function calculateDutyPoints($duty_type, $frequency) {
        // Define default points for each duty type
        $defaultPoints = [
            1 => 15, // example: Duty Type 1 indicates "RO"
            2 => 15,
            3 => 15,
            4 => 15,
            5 => 10,
            6 => 15,
            7 => 15,
            8 => 15,
            9 => 10,
            10 => 15,
            11 => 15,
            12 => 15,
            13 => 15,
            14 => 15,
            15 => 15,
            100 => 15,
            99 => 1,
            98 => 15,
            97 => 15
        ];

        // Calculate points based on duty type and frequency
        if (isset($defaultPoints[$duty_type])) {
            $points = $defaultPoints[$duty_type] * $frequency;
            return $points;
        }

        // If duty type is not found, return a default value (0 in this case)
        return 0;
    }

    $leaderboardData = array(); // Array to hold leaderboard data

    $query = "SELECT gmember_id, duty_type, COUNT(duty_type) AS Frequency
        FROM staff_duty
        GROUP BY gmember_id, duty_type";

    if ($stmt = $conn->prepare($query)) {
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $gmember_id = $row['gmember_id'];
                $duty_type = $row['duty_type'];
                $frequency = $row['Frequency'];

                if (!array_key_exists($gmember_id, $leaderboardData)) {
                    $leaderboardData[$gmember_id] = array();
                }

                $leaderboardData[$gmember_id][] = array(
                    "duty_type" => $duty_type,
                    "frequency" => $frequency
                );
            }
        }
        $stmt->close();
    } else {
        echo "Error in fetching data: " . $conn->error;
    }

    // Replace gmember_id with nickname in the leaderboardData
    $staffNicknames = [];
    $leaderboardDataWithNicknames = [];

    foreach ($leaderboardData as $gmember_id => $duties) {
        // Fetch the nickname from the database based on the gmember_id
        $query = "SELECT disc_nickname FROM discord_user WHERE gmember_id = ?";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("s", $gmember_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $nickname = $row['disc_nickname'];
                $staffNicknames[$gmember_id] = $nickname;

                $totalPoints = calculatePoints($duties); // Calculate total points for duties
                $leaderboardDataWithNicknames[$nickname] = $totalPoints;
            }

            $stmt->close();
        }
    }


    $passCriteria = 100; // Change this value to your criteria

    foreach ($leaderboardDataWithNicknames as $username => $points) {
        echo '<tr>';
        echo '<td>' . $username . '</td>';
        echo '<td>' . $points . '</td>';
        // Check if the staff passed or not
        $passed = ($points >= $passCriteria) ? 'Yes' : 'No';
        echo '<td>' . $passed . '</td>';
        echo '</tr>';
    }

    // Display the leaderboard data with nicknames and total points
    echo '<script>';
    echo 'console.log(' . json_encode($leaderboardDataWithNicknames) . ');';
    echo '</script>';

?>

                    </tbody>
                </table>
            </div>
        </div>

        <div class="duty-list">
            <h2>Duty</h2>
            <div class="duty-cards">
            <?php

        function getDutyType($dutyTypeNumber) {
            // Define duty types based on their numbers
            $dutyTypes = [
                1 => 'RO', // example: Duty Type 1 indicates "RO"
                2 => 'LRO',
                3 => 'ERO',
                4 => 'MRO',
                5 => 'URO',
                6 => 'RRO',
                7 => 'ERO',
                8 => 'mRO',
                9 => 'pRO',
                10 => 'SRO',
                11 => 'RLRO',
                12 => 'ELRO',
                13 => 'DRO',
                14 => 'Crag Session',
                15 => 'IRO',
                100 => 'In-Game Invite',
                99 => 'Kick',
                98 => 'Promotion',
                97 => 'Demotion'
                // Add more as needed...
            ];

            // Check if the duty type exists in the defined list
            if (array_key_exists($dutyTypeNumber, $dutyTypes)) {
                return $dutyTypes[$dutyTypeNumber];
            }
            // If not found, return a default message
            return 'Unknown Duty Type';
        }

$dutyData = array();

$dutyTypesQuery = "SELECT DISTINCT duty_type FROM staff_duty 
                   WHERE `timestamp` >= DATE_SUB(NOW(), INTERVAL 1 WEEK)";
    if ($dutyTypesStatement = $conn->prepare($dutyTypesQuery)) {
    $dutyTypesStatement->execute();
    $dutyTypesResult = $dutyTypesStatement->get_result();

    if ($dutyTypesResult) {
        while ($row = $dutyTypesResult->fetch_assoc()) {
            $dutyType = $row['duty_type'];

            $query = "SELECT d.gmember_id, u.disc_nickname AS worker_name, d.duty_type, COUNT(*) AS total_duties 
            FROM staff_duty d
            JOIN discord_user u ON d.gmember_id = u.gmember_id 
            WHERE d.duty_type = ? 
            GROUP BY d.gmember_id 
            ORDER BY COUNT(*) DESC 
            LIMIT 1";
            if ($stmt = $conn->prepare($query)) {
                $stmt->bind_param("s", $dutyType);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0) {
                    $topPerformer = $result->fetch_assoc();
                    $dutyData[] = $topPerformer;
                }

                $result->close(); // Close the result set
                $stmt->close(); // Close the prepared statement
            }
        }
    } else {
        echo "Error in fetching data: " . $conn->error;
    }

    $dutyTypesResult->close(); // Close the duty types result set
    $dutyTypesStatement->close(); // Close the prepared statement for duty types
}

$conn->close(); // Close the database connection

if (!empty($dutyData)) {
    echo '<script>';
echo 'console.log(' . json_encode($dutyData) . ');';
echo '</script>';
    foreach ($dutyData as $duty) {

        echo '<div class="card">';
        echo '<div class="worker-name">' . (isset($duty['worker_name']) ? $duty['worker_name'] : 'N/A') . '</div>';
        echo '<div class="worker-duty">' . (isset($duty['duty_type']) ? getDutyType($duty['duty_type']) : 'N/A') . '</div>';
        echo '</div>';
    }
} else {
    echo "No duty data available.";
}

?>
               
            </div>
        </div>
    </div>
    <div class="charts">
        <div class="chart">
           <canvas id="guildBarChart"></canvas>
        </div>
        <div class="chart">
        <canvas id="myBarChart"></canvas>
        </div>
        <div class="chart">
        <canvas id="myLineChart"></canvas>
        </div>
    </div>
</div>
            </main>

            

                <script>



window.addEventListener('load', function() {
  const data = {
    labels: ['Guild A', 'Guild B', 'Guild C', 'Guild D', 'Guild E', 'Guild F'],
    datasets: [{
      label: 'Guild Usage',
      data: [300, 200, 100, 50, 75, 150], // Replace with actual usage data
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40' // Replace with colors
      ]
    }]
  }; 

  const config = {
    type: 'pie', // Change the type to 'pie'
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Guild Usage Chart - Pie'
        }
      }
    },
  };

  const ctxP = document.getElementById('guildBarChart').getContext('2d');
  new Chart(ctxP, config);
});


const barData = {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'],
            datasets: [{
                label: 'Sample Bar Chart',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color for the bars
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };

        // Create the chart
        const ctxB = document.getElementById('myBarChart').getContext('2d');
        const myBarChart = new Chart(ctxB, {
            type: 'bar',
            data: barData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Sample Line Chart',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)', // Red color for the line
                borderWidth: 2
            }]
        };

        // Create the line chart
        const ctxL = document.getElementById('myLineChart').getContext('2d');
        const myLineChart = new Chart(ctxL, {
            type: 'line',
            data: lineData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });



            document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            const avatar = document.getElementById('avatar');
            const closeSidebarBtn = document.getElementById('closeSidebar');

            avatar.addEventListener('click', function() {
                sidebar.classList.add('show');
            });

            closeSidebarBtn.addEventListener('click', function() {
                sidebar.classList.remove('show');
            });
            
            });

            </script>




    <?php
    } else {
    //if not logged in
    header("Location: login.php");
    exit;
}

?>