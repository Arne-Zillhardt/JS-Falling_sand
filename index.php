<!DOCTYPE html>
<head>
<script src="script.js"></script>
<link  rel="stylesheet" href="style.css">
</head>

<body>
<h1 class="project-headline">Falling Sand</h1>
    <p class="project-paragraph">A pointless simulation of falling sand</p>
            <table class="sand-table">
            <?php
                for($i = 0; $i <= 40; $i++){
                    echo "<tr>";
                    for($j = 0; $j <= 40; $j++){
                        echo "<td id=\"". $j ."_". $i ."\" class=\"sand-cell\" onmouseEnter=\"blockSpawn($j, $i)\"></td>";
                    }
                    echo "</tr>";
                }
            ?>
            </table>

            <button onclick="initSandBoard()">RESET</button>
</body>