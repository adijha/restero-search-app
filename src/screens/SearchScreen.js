import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';

export default (SearchScreen = () => {
	const [ term, setTerm ] = useState('');
	const [ results, setResults ] = useState([]);
	const [ errorMessage, setErrorMessage ] = useState('');

	const searchApi = async (searchTerm) => {
		try {
			const response = await yelp.get('/search', {
				params: {
					limit: 50,
					term: searchTerm,
					location: 'san jose'
				}
			});
			setResults(response.data.businesses);
		} catch (err) {
			setErrorMessage('Something went werong');
		}
	};
	useEffect(() => {
		searchApi('pasta');
	}, []);

	return (
		<View>
			<SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => searchApi(term)} />

			<View style={{ top: 20 }}>
				{errorMessage ? <Text>{errorMessage}</Text> : null}
				<Text> We have found {results.length} results </Text>
			</View>
		</View>
	);
});

const styles = StyleSheet.create({});
