import React, { useState , useEffect , useCallback } from 'react';
import styled from 'styled-components';
import MyListButton from '../Button/MyListButton';
import PostCard from '@/components/post/PostCard';
import MyPagination from '../MyPagination';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import useQuery from '@/hooks/useQuery';
import { useNavigate } from 'react-router-dom';

function MypagePostList() {
    const navigate = useNavigate();
    const query = useQuery();
    const cookies = new Cookies();
    const dataList = ['bookmark', 'recent'];
    const [bookmarkArr, setBookmarkArr] = useState([]);
    const [active, setActive] = useState(dataList[0]);
    const [pageData, setPageData] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(query.get('page') || 1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    
    const tapBtnClick = (data) => {
       setActive(data);
    }

    const axiosGetBookmark = useCallback( async(page = 1) => {
        const Token = cookies.get('X-AUTH-TOKEN');
        if(!Token) return false;
        try{
            const { data } = await axios.get(`/bookmark/list?page=${page}`,{
                withCredentials: true,
                headers: {
                'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
                },
            });
            if(data.status == 200) {
                setPageData({...data.data,})
                setBookmarkArr([...data.data.contents]);
                setTotalPage(data.data.totalPages);
            }
            console.log(data.data)
        } catch (error) {
          toast.error(error);
          console.dir(error);
        }
      }, []);

      const handleResize = () => {
        if (window.innerWidth > 768) {
          setPostsPerPage(10);
        } else if (window.innerWidth > 320) {
          setPostsPerPage(5);
        } else {
          setPostsPerPage(3);
        }
      };

      const handleHistoryback = useCallback(() => {
        navigate(-1);
      }, []);

      const renderBookmarkList = () => {
        if(bookmarkArr.length > 0) {
            return (
                <>
                    <PostWrapper>
                        <ul>
                            {bookmarkArr.map((data) => (
                                <li key={data.boardId}>
                                    <PostCard data={data}/>
                                </li>
                            ))}
                        </ul>
                    </PostWrapper>
                    <MyPagination
                        data={pageData}
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        totalPage={totalPage}
                    />
                </>
            )
        }
      }

      useEffect(() => {
        const pageNum = query.get('page');
        setCurrentPage(pageNum || 1);
        axiosGetBookmark(pageNum);
      }, [query.get('page')]);

      useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <Container>
            <Wrapper>
                <ListTap>
                    {dataList.map((e) => (
                        <li key={e}><MyListButton data={e} active={active} onClick={() => tapBtnClick(e)} /></li>
                    ))}
                </ListTap>
                { active == dataList[0] ? renderBookmarkList() : ''}
            </Wrapper>
        </Container>
    )
}

export default MypagePostList;

const Container = styled('section')`
  background-color: #f6f7fb;
  padding: 60px 0 40px;
  position: relative;

  @media screen and (max-width: 820px) {
    padding: 20px 0 70px;
  }
`;

const Wrapper = styled('div')`
  max-width: 850px;
  margin: auto;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }
`;

const ListTap = styled('ul')`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    @media screen and (max-width: 820px) {
        width: 100%;
        gap: 16px;
    }
`

const PostWrapper = styled.div`
  li {
    padding-bottom: 14px;
  }
`;