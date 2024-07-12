import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { error } from "console";
import { ResponseDto } from "./response";
import { GetSignInUserResponseDto } from "./response/user";
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from "./request/board";
import { PostBoardResponsedto ,GetBoardResponseDto, IncreaseViewCountResponseDto, GetFavoriteListResponseDto, PutFavoriteResponseDto, PostCommentResponseDto, DeleteBoardResponseDto, PatchBoardResponseDto, GetLastestBoardListResponseDto, GetTop3BoardListResponseDto } from "./response/board";
import GetCommentListResponseDto from "./response/board/get-comment-list.response.dto";
import { GetPopularListResponseDto } from "./response/search";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: String) => { 
    return { headers: { Authorization: `Bearer ${accessToken}` } } 
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {     
                              // :타입선언
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
        
    return result;
};

export const SignUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
    .then(response =>{
        const responseBody: SignUpResponseDto = response.data;
        return responseBody;
    })
    .catch(error =>{
        if(!error.response.data) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};

export const PatchBoardRequest = async (boardNumber: number | string , requestBody:PatchBoardRequestDto, accessToken: string) => {
    const result= await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
    .then(response => {
        const responseBody : PatchBoardResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
    });
    return result;
};

export const putFavoriteRequest = async (boardNumber: number | string, accessToken: string) => {
    const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
    .then(response => {
        const responseBody : PutFavoriteResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
    });
    return result;
};

export const deleteBoardRequest = async (boardNumber:number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber),authorization(accessToken))
    .then(response => {
        const responseBody: DeleteBoardResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });

    return result;   
};

const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;

export const getPopularListRequest = async () => {
    const result = await axios.get(GET_POPULAR_LIST_URL())
    .then(response => {
        const responseBody : GetPopularListResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody : ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody : GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;
const GET_TOP_3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const POST_COMMENT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment`;
const PATCH_BOARD_URL  = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const PUT_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
    .then(response => {
        const requestBody: GetBoardResponseDto = response.data;
        return requestBody;
    })
    .catch(error =>{
        if(!error.response) return null;
        const responseBody = error.response.data;
        return responseBody;
    })
    return result
};

export const getLatestBoardListRequest = async () => {
    const result = await axios.get(GET_LATEST_BOARD_LIST_URL())
            .then(response => {
                const responseBody: GetLastestBoardListResponseDto = response.data;
                return responseBody;
            })
            .catch(error => {
                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            });
    return result;
};

export const getTop3BoardListRequest =async () => {
    const result = await axios.get(GET_TOP_3_BOARD_LIST_URL())
            .then(response => {
                const responseBody: GetTop3BoardListResponseDto = response.data;
                return responseBody;
            })
            .catch(error => {
                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            });
    return result;
};

export const increaseViewCountRequest = async (boardNumber: number | string) => {
    const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
    .then(response => {
        const responseBody: IncreaseViewCountResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    })
    return result;
};

export const getFavoriteListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
    .then(response=>{
        const responseBody: GetFavoriteListResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};

export const getCommentListRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
    .then(response => {
        const responseBody: GetCommentListResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result
};

export const postBoardRequest = async(requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
    .then(response => {
        const responseBody: PostBoardResponsedto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    })
    return result;
};

export const postCommentRequest = async (boardNumber:number | string, requestBody: PostCommentRequestDto, accessToken: string) => {
    const result = await axios.post(POST_COMMENT_URL(boardNumber),requestBody,authorization(accessToken))
    .then(response => {
        const responseBody: PostCommentResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    })
    return result;
};

const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = { headers: {'Content-Type': 'multipart/form-data'} };

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
        .then(response => {
            const responseBody: string = response.data;
            return responseBody
        })
        .catch( error => {
            return null;
        })
    return result;
};