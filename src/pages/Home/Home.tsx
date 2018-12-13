import * as React from 'react';
import { Cells } from '../../components/Cells/Cells';

interface Props {
  matrix?: number[][],
}

interface State {
  formattedMatrix: FormattedObject[][],
  maxRegion: number,
}

interface FormattedObject {
  filled: boolean,
  visited: boolean,
}

class Home extends React.Component<Props, State> {
  public static defaultProps: Props;
  constructor(props: any) {
    super(props);
    this.state = {
      formattedMatrix: [[]],
      maxRegion: 0,
    }
  }

  public transformCell = () => {
    const { matrix } = this.props;
    if (!matrix) { return; }

    const newObject = matrix.map((row): FormattedObject[] => {
      return row.map((element): FormattedObject => ({
        filled: !!element,
        visited: false,
      }))
    });

    this.setState(
      { formattedMatrix: newObject },
      this.traceCells
    );
  }

  public traceCells = async () => {
    const { formattedMatrix } = this.state;
    let maxRegion = 0;

    for (let row = 0; row < formattedMatrix.length; row++) {
      for (let column = 0; column < formattedMatrix[row].length; column++) {
        if (
          formattedMatrix[row][column].filled
        ) {
          const sizedData = await this.getRegionSize(formattedMatrix, row, column);
          const size = sizedData.size;
          maxRegion = size > maxRegion ? size : maxRegion;
        }
      }
    };

    this.setState({ maxRegion });
  }

  public getRegionSize = async (
    matrix: any[][],
    row: number,
    column: number,
  ): Promise<{
    size: number,
  }> => {
    if (
      row < 0
      || column < 0
      || row >= matrix.length
      || column >= matrix[row].length
    ) {
      return { size: 0 };
    }

    if (
      !matrix[row][column].filled
      || matrix[row][column].visited
    ) {
      return { size: 0 };
    }

    const newMatrix = [...matrix];
    newMatrix[row][column].visited = true;

    let size = 1;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = column - 1; c <= column + 1; c++) {
        if (r !== row || c !== column) {
          size += (await this.getRegionSize(newMatrix, r, c)).size;
        }
      }
    }
    return { size };
  }

  public onCellClick = (rowIndex: number, columnIndex: number) => {
    const { formattedMatrix } = this.state;

    let newMatrix = [...formattedMatrix];
    newMatrix[rowIndex][columnIndex].filled = !newMatrix[rowIndex][columnIndex].filled;
    newMatrix = newMatrix
      .map((row): FormattedObject[] => {
        return row.map((ele): FormattedObject => (
          { ...ele, visited: false }
        ));
      });

    this.setState({ formattedMatrix: newMatrix }, this.traceCells);
  }

  public renderCells = () => {
    const { formattedMatrix } = this.state;
    if (formattedMatrix[0].length === 0) { return null; }

    return formattedMatrix.map((row, rowIndex) => (
      <div
        style={{ display: 'flex' }}
        key={'row-' + rowIndex}
      >
        {row.map((element, columnIndex) => (
          <Cells
            on={element.filled}
            highlight={false}
            onClick={this.onCellClick.bind(this, rowIndex, columnIndex)}
            key={'cell-' + columnIndex}
          >
            <span>{element.filled ? 1 : 0}</span>
          </Cells>
        ))}
      </div>
    ));
  }

  public componentDidUpdate = (prevProps: Props) => {
    if (
      !prevProps
      || !prevProps.matrix
      || !this.props
      || !this.props.matrix
    ) {
      return;
    }

    if (prevProps.matrix.toString() !== this.props.matrix.toString()) {
      this.transformCell();
    }
  }

  public render = () => {
    const { maxRegion } = this.state;

    return (
      <div className={'container'}>
        {this.renderCells()}

        Max region: {maxRegion}
      </div>
    );
  }
}

Home.defaultProps = {
  matrix: [[]],
}

export default Home;