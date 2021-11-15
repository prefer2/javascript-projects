const modal = document.getElementById("modal")
        const closeBtn = modal.querySelector(".close-btn")
            closeBtn.addEventListener("click", e => {
            modal.style.display = "none"
        })
        const restartBtn = document.getElementById("restart");
        restartBtn.addEventListener("click", ()=> {
            modal.style.display = "none";
            const li = document.createElement("li");
            const textNode = document.createTextNode($score.textContent);
            li.appendChild(textNode);
            document.getElementById('scoreBoard').appendChild(li);
            restart();
        })

        const $table = document.getElementById('table');
        const $score = document.getElementById('score');
        let data = [];
        let history = [];

        const startGame = () => {
            /* 4*4 table 만들기 */

             //fragment 성능을 위해 사용
            const $fragment = document.createDocumentFragment();

            [1,2,3,4].forEach(()=>{
                const rowData = [];
                data.push(rowData);
                const $tr = document.createElement('tr');
                [1,2,3,4].forEach(()=>{
                    rowData.push(0);
                    const $td = document.createElement('td');
                    $tr.appendChild($td);
                });
                $fragment.appendChild($tr);
            });

            $table.appendChild($fragment);

            /* 랜덤한 빈 곳에 2 넣기 */
            put2ToRandomCell();
            put2ToRandomCell();

            /* 화면에 숫자 표현하기 */
            draw();
        }

        const restart = () => {
            data = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
            $score.textContent = 0;
            put2ToRandomCell();
            put2ToRandomCell();
            draw();
        }

        const put2ToRandomCell = () => {
            let emptyCell = [];
            const twofour = [2,2,2,2,2,2,2,2,2,4]

            //비어있는 cell 찾기
            data.forEach((row, i)=>{
                row.forEach((cellData, j)=>{
                    if(!cellData){
                        emptyCell.push([i,j]);
                    }
                })
            })
            const randomCell = emptyCell[Math.floor(Math.random()*emptyCell.length)];
            data[randomCell[0]][randomCell[1]] = twofour[Math.floor(Math.random()*twofour.length)];
        }

        const draw = () => {
            data.forEach((row, i)=> {
                row.forEach((cell, j)=>{

                    const $target = $table.children[i].children[j];
                    if(cell>0){
                        $target.textContent = cell;
                        $target.className = 'color-' + cell;
                    }
                    else{
                        $target.textContent = '';
                        $target.className = '';
                    }
                })
            })
        }

        startGame();

        const moveCells = (dir) => {
            history.push({data: JSON.parse(JSON.stringify(data)), score:$score.textContent});
            switch(dir){
                case 'left': {
                    const newData = [[], [], [], []];
                    data.forEach((rowData, i) => {
                        rowData.forEach((cellData, j) => {
                        if (cellData) {
                            const currentRow = newData[i]
                            const prevData = currentRow[currentRow.length - 1];
                            if (prevData === cellData) { // 이전 값과 지금 값이 같으면
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length - 1] * 2;
                                currentRow[currentRow.length - 1] *= -2;
                            } else {
                            newData[i].push(cellData);
                            }
                        }
                        });
                    });
                
                    [1, 2, 3, 4].forEach((rowData, i) => {
                        [1, 2, 3, 4].forEach((cellData, j) => {
                        data[i][j] = Math.abs(newData[i][j]) || 0;
                        });
                    });
                    break;
                }

                case 'right': {
                    const newData = [[], [], [], []];
                    data.forEach((rowData, i) => {
                        rowData.forEach((cellData, j) => {
                        if (rowData[3 - j]) {
                            const currentRow = newData[i]
                            const prevData = currentRow[currentRow.length - 1];
                            if (prevData === rowData[3 - j]) {
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length - 1] * 2;
                                currentRow[currentRow.length - 1] *= -2;
                            } else {
                            newData[i].push(rowData[3 - j]);
                            }
                        }
                        });
                    });
                    
                    [1, 2, 3, 4].forEach((rowData, i) => {
                        [1, 2, 3, 4].forEach((cellData, j) => {
                        data[i][3 - j] = Math.abs(newData[i][j]) || 0;
                        });
                    });
                    break;
                }

                case 'up': {
                    const newData = [[], [], [], []];
                    data.forEach((rowData, i) => {
                        rowData.forEach((cellData, j) => {
                        if (cellData) {
                            const currentRow = newData[j]
                            const prevData = currentRow[currentRow.length - 1];
                            if (prevData === cellData) {
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length - 1] * 2;
                                currentRow[currentRow.length - 1] *= -2;
                            } else {
                            newData[j].push(cellData);
                            }
                        }
                        });
                    });

                    [1, 2, 3, 4].forEach((cellData, i) => {
                        [1, 2, 3, 4].forEach((rowData, j) => {
                        data[j][i] = Math.abs(newData[i][j]) || 0;
                        });
                    });
                    break;
                }
                case 'down': {
                    const newData = [[], [], [], []];
                    data.forEach((rowData, i) => {
                        rowData.forEach((cellData, j) => {
                        if (data[3 - i][j]) {
                            const currentRow = newData[j];
                            const prevData = currentRow[currentRow.length - 1];
                            if (prevData === data[3 - i][j]) {
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length - 1] * 2;
                                currentRow[currentRow.length - 1] *= -2;
                            } else {
                            newData[j].push(data[3 - i][j]);
                            }
                        }
                        });
                    });
        
                    [1, 2, 3, 4].forEach((cellData, i) => {
                        [1, 2, 3, 4].forEach((rowData, j) => {
                        data[3 - j][i] = Math.abs(newData[i][j]) || 0;
                        });
                    });
                    break;
                    }
            }

            if (!data.flat().includes(0)) { // 빈칸이 없으면 패배
                modal.style.display = "flex"
                document.getElementById("endScore").textContent = $score.textContent;
            } else {
                put2ToRandomCell();
                draw();
            }
        }

        window.addEventListener('keydown', (e)=>{
           
            if(e.key === 'ArrowUp'){
                moveCells('up');
            }
            else if(e.key === 'ArrowDown'){
                moveCells('down');
            }
            else if(e.key === 'ArrowLeft'){
                moveCells('left');
            }
            else if(e.key === 'ArrowRight'){
                moveCells('right');
            }

        })

      
        const backBtn = () => {
            const preData = history.pop();
            if(!preData) return;
            console.log(preData.data)
            data = preData.data;
            $score.textContent = preData.score;
            draw();
        }