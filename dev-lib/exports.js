/**
 * 模块暴露
 */

( function ( global ) {

    define( 'kf.start', function ( require ) {

        global.kf = {

            // base
            Formula: require( "formula" ),

            // expression
            TextExpression: require( "expression/text" ),
            EmptyExpression: require( "expression/empty" ),
            CombinationExpression: require( "expression/compound-exp/combination" ),

            AdditionExpression: require( "expression/compound-exp/binary-exp/addition" ),
            AsteriskExpression: require( "expression/compound-exp/binary-exp/asterisk" ),
            DivisionExpression: require( "expression/compound-exp/binary-exp/division" ),
            DotExpression: require( "expression/compound-exp/binary-exp/dot" ),
            EqualExpression: require( "expression/compound-exp/binary-exp/equal" ),
            FractionExpression: require( "expression/compound-exp/binary-exp/fraction" ),
            IntegrationExpression: require( "expression/compound-exp/integration" ),
            LogicalConjunctionExpression: require( "expression/compound-exp/binary-exp/logical-conjunction" ),
            LogicalDisjunctionExpression: require( "expression/compound-exp/binary-exp/logical-disjunction" ),
            MultiplicationExpression: require( "expression/compound-exp/binary-exp/multiplication" ),
            RadicalExpression: require( "expression/compound-exp/binary-exp/radical" ),
            SuperscriptExpression: require( "expression/compound-exp/binary-exp/superscript" ),
            SubscriptExpression: require( "expression/compound-exp/binary-exp/subscript" ),
            SubtractionExpression: require( "expression/compound-exp/binary-exp/subtraction" ),
            SummationExpression: require( "expression/compound-exp/binary-exp/summation" ),
            PlusMinusExpression: require( "expression/compound-exp/binary-exp/plus-minus" ),
            MinusPlusExpression: require( "expression/compound-exp/binary-exp/minus-plus"),

            // set expression
            IntersectionExpression: require( "expression/compound-exp/binary-exp/set/intersection" ),
            UnionExpression: require( "expression/compound-exp/binary-exp/set/union" ),
            SubSetExpression: require( "expression/compound-exp/binary-exp/set/sub-set" ),
            SuperSetExpression: require( "expression/compound-exp/binary-exp/set/super-set" ),
            InSetExpression: require( "expression/compound-exp/binary-exp/set/in-set" )

        };

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
