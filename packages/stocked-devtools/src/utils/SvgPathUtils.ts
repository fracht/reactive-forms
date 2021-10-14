export type Point = {
    x: number;
    y: number;
};

export type DrawLineOptions = {
    cornerRadius: number;
    smoothness: number;
    offset: number;
};

export namespace SvgPathUtils {
    export const moveToPoint = (point: Point) => {
        return `M ${point.x},${point.y}`;
    };

    export const drawLineToPoint = (point: Point) => {
        return `L ${point.x},${point.y}`;
    };

    export const drawBezierCurveToPoint = (controlPoint1: Point, controlPoint2: Point, point: Point) => {
        return `C ${controlPoint1.x},${controlPoint1.y},${controlPoint2.x},${controlPoint2.y},${point.x},${point.y}`;
    };

    export const drawVerticalSmoothLine = (from: Point, to: Point, options: DrawLineOptions) => {
        const corner1ControlPoint = linearInterpolation(
            {
                x: from.x,
                y: (from.y + to.y) / 2
            },
            {
                x: from.x,
                y: to.y
            },
            options.offset
        );

        const corner2ControlPoint = linearInterpolation(
            {
                x: to.x,
                y: (from.y + to.y) / 2
            },
            to,
            options.offset
        );

        const corner1BeginPoint = linearInterpolation(corner1ControlPoint, from, options.cornerRadius);
        const corner1EndPoint = linearInterpolation(corner1ControlPoint, corner2ControlPoint, options.cornerRadius);

        const corner2BeginPoint = linearInterpolation(corner2ControlPoint, corner1ControlPoint, options.cornerRadius);
        const corner2EndPoint = linearInterpolation(corner2ControlPoint, to, options.cornerRadius);

        const corner1ControlPoint1 = linearInterpolation(corner1ControlPoint, from, options.smoothness);
        const corner1ControlPoint2 = linearInterpolation(corner1ControlPoint, corner2ControlPoint, options.smoothness);

        const corner2ControlPoint1 = linearInterpolation(corner2ControlPoint, corner1ControlPoint, options.smoothness);
        const corner2ControlPoint2 = linearInterpolation(corner2ControlPoint, to, options.smoothness);

        if (isPointEqual(corner1ControlPoint, corner2BeginPoint)) {
            const controlPoint = middlePoint(corner1BeginPoint, corner2EndPoint);

            return [
                moveToPoint(from),
                drawLineToPoint(corner1BeginPoint),
                drawBezierCurveToPoint(controlPoint, controlPoint, corner2EndPoint),
                drawLineToPoint(to)
            ].join(' ');
        } else {
            return [
                moveToPoint(from),
                drawLineToPoint(corner1BeginPoint),
                drawBezierCurveToPoint(corner1ControlPoint1, corner1ControlPoint2, corner1EndPoint),
                drawLineToPoint(corner2BeginPoint),
                drawBezierCurveToPoint(corner2ControlPoint1, corner2ControlPoint2, corner2EndPoint),
                drawLineToPoint(to)
            ].join(' ');
        }
    };

    const middlePoint = (a: Point, b: Point) => ({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    });

    const isPointEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

    const linearInterpolation = (from: Point, to: Point, delta: number): Point => {
        const newPoint = {
            x: from.x,
            y: from.y
        };

        if (from.x < to.x) {
            newPoint.x = Math.min(from.x + delta, to.x);
        } else {
            newPoint.x = Math.max(from.x - delta, to.x);
        }

        if (from.y < to.y) {
            newPoint.y = Math.min(from.y + delta, to.y);
        } else {
            newPoint.y = Math.max(from.y - delta, to.y);
        }

        return newPoint;
    };
}
