import ex from './ex.png';
import floor from './floor.png';
import base1 from './base1.png';
import tile from './tile.png';
import tile_pipe from './tile_pipe.png';
import pipe_0000 from './pipe_0000.png';
import pipe_0001 from './pipe_0001.png';
import pipe_0010 from './pipe_0010.png';
import pipe_0100 from './pipe_0100.png';
import pipe_1000 from './pipe_1000.png';
import pipe_1100 from './pipe_1100.png';
import pipe_1010 from './pipe_1010.png';
import pipe_1001 from './pipe_1001.png';
import pipe_0110 from './pipe_0110.png';
import pipe_0101 from './pipe_0101.png';
import pipe_0011 from './pipe_0011.png';
import pipe_1110 from './pipe_1110.png';
import pipe_1101 from './pipe_1101.png';
import pipe_1011 from './pipe_1011.png';
import pipe_0111 from './pipe_0111.png';
import pipe_1111 from './pipe_1111.png';
import background from './background.png';

interface MapImages {
  [key: string]: string;
}

const mapImages: MapImages = {
  ex: ex,
  floor: floor,
  base1: base1,
  tile: tile,
  pipe: './pipe',
  pipe_0000: pipe_0000,
  pipe_0001: pipe_0001,
  pipe_0010: pipe_0010,
  pipe_0100: pipe_0100,
  pipe_1000: pipe_1000,
  pipe_1100: pipe_1100,
  pipe_1010: pipe_1010,
  pipe_1001: pipe_1001,
  pipe_0110: pipe_0110,
  pipe_0101: pipe_0101,
  pipe_0011: pipe_0011,
  pipe_1110: pipe_1110,
  pipe_1101: pipe_1101,
  pipe_1011: pipe_1011,
  pipe_0111: pipe_0111,
  pipe_1111: pipe_1111,
  background: background,
  tile_pipe: tile_pipe,
};

export default mapImages;
