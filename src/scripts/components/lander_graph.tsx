let createLanderGrapher = (x: HTMLCanvasElement) => {
  let options = {
    canvas: x,
    ctx: x.getContext("2d"),
    backgroundColor: "#252525",
    fillColor: "#42b9f4",
    lineColor: "#efefef",
    lineWidth: 20,
    lineY: 0.2,
    boundingBox: {
      x: 500,
      y: 500
    }
  };

  let points = [
    [[0.2, 0.2], [0.4, 0.8], [0.5, 0.2]],
    [[0.2, 0.2], [0.4, 0.8], [0.475, 0.55], [0.52, 0.65], [0.7, 0.2]],
    [[0.2, 0.2], [0.3, 0.4], [0.4, 0.3], [0.5, 0.8], [0.7, 0.4]],
    [
      [0.3229166666666667, 0.2],
      [0.3763020833333333, 0.7986111111111112],
      [0.4986979166666667, 0.5509259259259259],
      [0.5833333333333334, 0.6759259259259259],
      [0.70703125, 0.38888888888888884],
      [0.8255208333333334, 0.2]
    ],
    [
      [0.13411458333333334, 0.2],
      [0.2708333333333333, 0.45138888888888884],
      [0.3203125, 0.37037037037037035],
      [0.3697916666666667, 0.8587962962962963],
      [0.4583333333333333, 0.6111111111111112],
      [0.5703125, 0.4837962962962963],
      [0.703125, 0.32638888888888884],
      [0.8151041666666666, 0.2]
    ],
    [
      [0.061197916666666664, 0.2],
      [0.15234375, 0.6388888888888888],
      [0.19401041666666666, 0.46990740740740744],
      [0.2734375, 0.8125],
      [0.30078125, 0.6712962962962963],
      [0.3880208333333333, 0.6203703703703703],
      [0.5065104166666666, 0.8425925925925926],
      [0.55859375, 0.6875],
      [0.62890625, 0.5949074074074074],
      [0.7122395833333334, 0.5740740740740741],
      [0.7877604166666666, 0.37731481481481477],
      [0.8828125, 0.5925925925925926],
      [0.9309895833333334, 0.43287037037037035],
      [0.97265625, 0.27083333333333337],
      [0.9830729166666666, 0.2]
    ]
  ];

  let anchor_points = [[0, 0.2], [1, 0.2]];

  let directionToggle = true;
  let current_peak = 0;
  let all_points: any[];
  let initial_points: number[][];
  function directionToggler() {
    directionToggle = !directionToggle;
    if (directionToggle) {
      overTimePaint(all_points, initial_points, 1000, directionToggler);
    } else {
      current_peak == points.length - 1 ? (current_peak = 0) : current_peak++;
      all_points = [anchor_points[0], ...points[current_peak], anchor_points[1]];
      initial_points = all_points.map(x => [1 - x[0], 0.8]);
      all_points = all_points.map(x => [1 - x[0], 1 - x[1]]);
      overTimePaint(initial_points, all_points, 2000, directionToggler);
    }
  }

  directionToggler();

  function overTimePaint(start_set: string | any[], end_set: number[][], time: number, callback: { (): void; (): void; (): void; }) {
    let iterations = 0;
    let painting_interval = setInterval(() => {
      let to_paint_points = [];
      for (let a = 0; a < start_set.length; a++) {
        let x_point = end_set[a][0];
        let y_point =
          start_set[a][1] + (end_set[a][1] - start_set[a][1]) * iterations;
        to_paint_points.push([x_point, y_point]);
        iterations = iterations + (1 - iterations) / 1 / (time / (1000 / 60));
      }
      if (iterations > 0.999) {
        clearTimeout(painting_interval);
        callback();
      }
      paintFrame(to_paint_points, options);
    }, 1000 / 60);
  }

  function paintFrame(points_set: string | any[], options: { canvas: any; ctx: any; backgroundColor: any; fillColor: any; lineColor: any; lineWidth: any; lineY: any; boundingBox?: { x: number; y: number; }; BoundingB?: any; }) {
    let canvas = options.canvas;
    let ctx = options.ctx;
    
    let bounding = options.BoundingB
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = options.lineWidth * 2;
    ctx.strokeStyle = options.lineColor;
    let current_point = points_set[0];
    let remain_points = points_set.slice(1, points_set.length);
    ctx.beginPath();
    ctx.moveTo(current_point[0] * canvas.width, current_point[1] * canvas.height);
    for (let a = 0; a < remain_points.length; a++) {
      ctx.lineTo(
        remain_points[a][0] * canvas.width,
        remain_points[a][1] * canvas.height
      );
      ctx.stroke();
      current_point = points;
    }
    ctx.closePath();
    ctx.fillStyle = options.fillColor;
    ctx.fill();
    let lineHeight = 1 - options.lineY;
    ctx.fillRect(
      0,
      lineHeight * canvas.height - 5,
      canvas.width,
      canvas.height * 0.3
    );
  }
}

export default createLanderGrapher;