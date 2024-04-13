import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

interface CoffeeCardProps {
    id:string
    name: string;
    index: number;
    type: string;
    roasted: string;
    imagelink_square: any;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCard: FC<CoffeeCardProps> = ({ name, id, index, type, roasted, imagelink_square, special_ingredient, average_rating, price, buttonPressHandler }) => {
  return (
    <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={styles.CardLinearGradientContainer}
    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
        <ImageBackground source={imagelink_square} style={styles.CardImageBG} resizeMethod="auto">
            <View style={styles.CardRatingContainer}>
                <CustomIcon name="star" size={FONTSIZE.size_16} color={COLORS.primaryOrangeHex} />
                <Text style={styles.CardRatingText}>{average_rating}</Text>
            </View>
        </ImageBackground>
        <Text style={styles.CardTitle}>
            {name}
        </Text>
        <Text style={styles.CardSubTitle}>
            {special_ingredient}
        </Text>
        <View style={styles.CardFooterRow}>
            <Text style={styles.CardPriceCurrency}>
                <Text style={styles.CardPrice}>$</Text>
                {price.price}
            </Text>
            <TouchableOpacity onPress={buttonPressHandler}>
                <BGIcon
                color={COLORS.primaryWhiteHex}
                name={'add'}
                BGColor={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_10}
                />
            </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        lineHeight: 22,
    },
    CardFooterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.space_15,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex,
    },
});
