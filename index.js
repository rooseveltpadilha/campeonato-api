import express from "express";
import fs from "fs";
import path from "path";

const { readFile, weiteFile } = fs.promises;

// const app = express();
// app.use(express.json());

// app.get('/times/ganhador', (res, req) => {
//   res.send("hello world");
// });

// app.listen(3000);

const times = [];

(async () => {
  try {
    const resp = await readFile(path.join('./', '2003.json'));
    let data = JSON.parse(resp);

    data[0].partidas.forEach(partida => {
      times.push({ time: partida.mandante, pontuacao: 0 });
      times.push({ time: partida.visitante, pontuacao: 0 });
    });

    data.forEach(rodada => {
      rodada.partidas.forEach(partida => {
        if (partida.placar_visitante > partida.placar_mandante) {
          const indexVisitante = times.findIndex(item => item.time === partida.visitante);
          let timeVisitante = times[indexVisitante];
          timeVisitante.pontuacao += 3;
        } else if (partida.placar_mandante > partida.placar_visitante) {
          const indexMandante = times.findIndex(item => item.time === partida.mandante);
          let timeMandante = times[indexMandante];
          timeMandante.pontuacao += 3;
        } else {
          const indexVisitante = times.findIndex(item => item.time === partida.visitante);
          const indexMandante = times.findIndex(item => item.time === partida.mandante);

          let timeVisitante = times[indexVisitante];
          let timeMandante = times[indexMandante];

          timeVisitante.pontuacao += 1;
          timeMandante.pontuacao += 1;
        }
      });
    });

    times.sort((a, b) => {
      return b.pontuacao - a.pontuacao;
    });

    console.log(times)
  } catch (err) {
    console.log(err)
  }
})();