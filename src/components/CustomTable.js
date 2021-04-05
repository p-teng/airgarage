import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function CustomTable(props) {
    var businesses = props.businesses;

    //score = ( number of reviews * rating ) / (number of reviews + 1)
    function calcScore(numReviews, rating) {
        var numer = numReviews * rating;
        var denom = numReviews + 1;
        var score = numer / denom;
        score = score.toPrecision(2);
        return score;
    }

    function sortByScore(businesses) {
        var sortedBusinesses = businesses.sort((a, b) => a.score > b.score ? 1 : -1)
        return sortedBusinesses;
    }

    for (var i = 0; i < businesses.length; i++) {
        businesses[i].score = calcScore(businesses[i].review_count, businesses[i].rating);
    }

    businesses = sortByScore(businesses);

    //Show a list of parking lots from Yelp in that location with the address, an image if available, star rating, review count, and link to the Yelp page.
    return(
        <div>
            <Table style={{width: "70%", marginLeft: "15%"}}>
                <TableHead>
                    <TableCell style={{fontSize: "1.2rem"}}>
                    </TableCell>
                    <TableCell style={{fontSize: "1.2rem"}}>
                        Name
                    </TableCell>
                    <TableCell style={{fontSize: "1.2rem"}}>
                        Location
                    </TableCell>
                    <TableCell style={{fontSize: "1.2rem"}}>
                        Star Rating
                    </TableCell>
                    <TableCell style={{fontSize: "1.2rem"}}>
                        Review Count
                    </TableCell>
                    <TableCell style={{fontSize: "1.2rem"}}>
                        Score
                    </TableCell>
                </TableHead>
                {businesses.map((business) => (
                    <TableRow>
                        <TableCell style={{fontSize: "1.2rem"}}>
                            {business.image_url == "" ? "Image not available" : <img src={business.image_url} style={{width: "6rem", height: "6rem"}} />}
                        </TableCell>
                        <TableCell style={{fontSize: "1.2rem"}}>
                            <Link href={business.url}>{business.name}</Link>
                        </TableCell>
                        <TableCell style={{fontSize: "1.2rem"}}>
                            {business.location.display_address[0]}
                            <br></br>
                            {business.location.display_address[1]}
                        </TableCell>
                        <TableCell style={{fontSize: "1.2rem"}}>
                            {business.rating}
                        </TableCell>
                        <TableCell style={{fontSize: "1.2rem"}}>
                            {business.review_count}
                        </TableCell>
                        <TableCell style={{fontSize: "1.2rem"}}>
                            {business.score}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        </div>
    )
}