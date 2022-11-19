import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../state/types";
import jsPDF from "jspdf";
import { getCompetitionsAction } from "../state/actions/data/getCompetitions";

const Report = () => {
  const competitions = useSelector(
    (state: AppState) => state.dataState.competitions
  );

  const { accessToken, username } = useSelector(
    (state: AppState) => state.userState.user!
  );

  const dispatch = useDispatch();

  const getHtmlReport = () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.width = "400px";
    container.style.margin = "auto";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "space-between";

    competitions.forEach(({ description, date, time, results }, index1) => {
      let h3 = document.createElement("h3");
      h3.style.fontSize = "14px";
      h3.style.color = "green";
      h3.innerHTML = `${description}  ${date} ${time}`;

      results.forEach(({ athlete, score, rating }, index2) => {
        let p = document.createElement("p");
        p.style.fontSize = "10px";
        p.style.color = "black";
        p.innerHTML = ` ${index2 + 1}.${
          athlete.username
        }  Wynik: ${score} Ocena: ${rating}`;
        h3.appendChild(p);
      });

      container.appendChild(h3);
    });

    return container;
  };

  const generatePDF = () => {
    var pdf = new jsPDF({
      orientation: "p",
      unit: "px",
    });
    pdf.html(getHtmlReport(), {
      callback: function (doc) {
        doc.save();
      },
    });
  };

  useEffect(() => {
    getCompetitionsAction(username, accessToken, dispatch);
  }, [username, dispatch, accessToken]);

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Raport</h2>
      </div>
      <button className="primary element-hover" onClick={generatePDF}>
        Generuj raport
      </button>
    </div>
  );
};

export default Report;
