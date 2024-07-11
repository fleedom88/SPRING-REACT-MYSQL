import { BoardListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetLastestBoardListResponseDto extends ResponseDto{
    latestList: BoardListItem[];
}